import {
  Directive,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  TemplateRef,
  ComponentFactory,
  ComponentRef,
} from '@angular/core';

import { IndeterminateProgressSpinnerComponent } from '../components/indeterminate-progress-spinner/indeterminate-progress-spinner.component';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective {

  @Input('appLoadingDiameter') diameter: number = 100;
  @Input('appLoadingColor') color: string = 'primary';
  @Input('appLoading') set ifLoading(val: boolean) {
    this.vc.clear();

    if (!val) {
      const componentRef: ComponentRef<IndeterminateProgressSpinnerComponent> =
        this.vc.createComponent(this.loadingFactory);

      componentRef.instance.diameter = this.diameter;
      componentRef.instance.color = this.color;
    } else {
      this.vc.createEmbeddedView(this.templateRef);
    }
  }

  private loadingFactory: ComponentFactory<IndeterminateProgressSpinnerComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private vc: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) {
    this.loadingFactory = this.resolver.resolveComponentFactory(IndeterminateProgressSpinnerComponent);
  }

}
