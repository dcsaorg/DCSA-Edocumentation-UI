#!/usr/bin/python3

import collections
import json
import sys


def main():
  in_filename = 'dcsaorg-DCSA_BKG-2.0.0-Beta-1-resolved.json'
  out_file = 'normalized.json'
  with open(in_filename) as fd:
    data = json.load(fd)

  schemas = data['components']['schemas']
  for object_name, schema in schemas.items():
    remove_all_of_in_schema(object_name, schema, schemas)

  print(json.dumps(data))


def _flatten_all_of_in_properties(object_name: str, properties: 'Dict[str, Any]', schemas: 'Dict[str, Any]') -> None:
  for k, v in properties.items():
    remove_all_of_in_schema(f"{object_name}.{k}", v, schemas)


def _discarding_merge(all_of: 'List[Dict[str, Any]]') -> 'Optional[Dict[str, Any]]':
  refs = [x for x in all_of if '$ref' in x]
  if len(refs) > 1:
    print('W: Discarding merge failed due to multiple "$ref"', file=sys.stderr)
    return None
  if not refs:
    result = {}
    for x in all_of:
      result = _merge_entities(result, x)
      if result is None:
        break
    return result

  for entity in all_of:
    if '$ref' in entity:
      continue
    if entity.keys() <= frozenset({'description', 'deprecated'}):
      continue

    print(f'W: Discarding merge failed due unsupported keys: {sorted(entity.keys())}', file=sys.stderr)
    return None
  return refs[0]


def _unpack_single_key_dict(d: 'Dict[str, Any]') -> 'Tuple[str, Any]':
  assert len(d) == 1
  return next(iter(d.items()))


def _merge_entities(a: 'Dict[str, Any]', b: 'Dict[str, Any]') -> 'Optional[Dict[str, Any]]':
  if '$ref' in a or '$ref' in b:
    print('W: Merge failed due to "$ref"', file=sys.stderr)
    return None
  result = a.copy()
  for k, v in b.items():
    if k not in result:
      result[k] = v
      continue
    if k == 'allOf':
      result[k].extend(v)
    else:
      result[k] = v
  return result


def _flatten_all_of_as_properties(object_name: str, all_of: 'List[Dict[str, Any]]', schemas: 'Dict[str, Any]') -> 'Optional[Dict[str, Any]]':
  properties = collections.defaultdict(list)
  if len(all_of) == 1 and '$ref' in all_of[0]:
    ref = all_of[0]['$ref']
    prefix = '#/components/schemas/'
    if not ref.startswith(prefix):
      print('W: Flatten failed - "$ref" was not a #/components/schemas/ ref', file=sys.stderr)
      return None, False
    entity_ref = ref[len(prefix):]
    if entity_ref not in schemas:
      print('W: Flatten failed - "$ref" was not present in schemas (nested refs not supported)', file=sys.stderr)
      return None, False
    result = schemas[entity_ref]
    print(f'I: Expanding "{ref}" to {result}', file=sys.stderr)
    return {'$ref': ref}, True
  for entry in all_of:
    if len(entry) == 1 and '$ref' in entry:
      print(f'W: Flatten failed due to "$ref": {all_of}', file=sys.stderr)
      return None, False
    if 'type' not in entry or entry['type'] != 'object':
      raise ValueError(f"Unknown type for {object_name}: {all_of}")
    if not (entry.keys() <= frozenset({'type', 'properties'})):
      return None, False
    prop, content = _unpack_single_key_dict(entry['properties'])
    properties[prop].append(content)

  result = {}
  for k, lv in properties.items():
    if len(lv) == 1:
      result[k] = lv[0]
    else:
      merged = _discarding_merge(lv)
      if merged is None:
        return None, False
      result[k] = merged
  return result, False



def remove_all_of_in_schema(object_name: str, schema: 'Dict[str, Any]', schemas: 'Dict[str, Any]') -> None:
  if 'allOf' in schema:
    assert 'properties' not in schema
    res, inline = _flatten_all_of_as_properties(object_name, schema['allOf'], schemas)
    if res is None:
      print(f"W: Cannot flatten {object_name}", file=sys.stderr)
      return
    del schema['allOf']
    if inline:
      assert '$ref' not in schema
      schema.update(res)
    else:
      schema['properties'] = res

  if 'properties' in schema:
    _flatten_all_of_in_properties(object_name, schema['properties'], schemas)


if __name__ == '__main__':
  main()
