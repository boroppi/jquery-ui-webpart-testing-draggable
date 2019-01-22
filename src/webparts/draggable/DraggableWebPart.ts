import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './DraggableWebPart.module.scss';
import * as strings from 'DraggableWebPartStrings';
import MyDraggableTemplate from './MyDraggableTemplate';
import * as JQuery from 'jquery';
import 'jqueryui';

import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IDraggableWebPartProps {
  description: string;
  width: number;
  height: number;
  color: string;
}

export default class DraggableWebPart extends BaseClientSideWebPart<IDraggableWebPartProps> {

  public constructor() {
    super();

    SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  }

  public render(): void {
    this.domElement.innerHTML = MyDraggableTemplate.templateHtml;
    
    const style: JQueryCssProperties = {
      height: this.properties.height,
      width: this.properties.width,
      backgroundColor: this.properties.color      
    };
    console.log(style);
    JQuery('div',this.domElement).draggable();

    JQuery('div',this.domElement).css(style);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('height', {
                  label: "Height"
                }),
                PropertyPaneTextField('width', {
                  label: "Width"
                }),
                PropertyPaneDropdown('color', {
                  label: "Colour",
                  options: [
                    { key: 'red', text: 'Red' },
                    { key: 'yellow', text: 'Yellow'},
                    { key: 'green', text: 'Green'},
                    { key: 'teal', text: 'Teal'},
                    { key: 'blue', text: 'Blue'},
                    { key: 'magenta', text: 'Magenta'},
                    { key: 'purple', text: 'Purple'}
                  ]})
              ]
            }
          ]
        }
      ]
    };
  }
}
