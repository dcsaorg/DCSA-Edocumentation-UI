import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-ui-vs-api-component',
  templateUrl: './ui-vs-api-component.component.html',
  styleUrls: ['./ui-vs-api-component.component.scss']
})
export class UiVsApiComponentComponent {

  @Input("uiMode")
  uiModeTemplate?: TemplateRef<any>;


  @Input("apiMode")
  apiModeTemplate?: TemplateRef<any>;
}
