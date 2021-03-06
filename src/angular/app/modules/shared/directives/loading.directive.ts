import {
  Directive,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  TemplateRef,
  ComponentFactory,
  ComponentRef,
  AfterContentInit,
} from '@angular/core';

import { IndeterminateProgressSpinnerComponent } from '../components/indeterminate-progress-spinner/indeterminate-progress-spinner.component';

const DEFAULT_DIAMETER = 100;

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements AfterContentInit {

  @Input('appLoadingDiameter') diameter: number;
  @Input('appLoadingColor') color: string = 'primary';
  @Input('appLoading') set ifLoading(val: boolean) {
    this.vc.clear();

    if (!val) {
      const componentRef: ComponentRef<IndeterminateProgressSpinnerComponent> =
        this.vc.createComponent(this.loadingFactory);

      if (this.width) {
        componentRef.location.nativeElement.firstElementChild.style.width = `${this.width}px`;
      }

      componentRef.instance.diameter = this.diameter ?? DEFAULT_DIAMETER;
      componentRef.instance.color = this.color;
    } else {
      this.vc.createEmbeddedView(this.templateRef);
    }
  }

  private width: number;
  private loadingFactory: ComponentFactory<IndeterminateProgressSpinnerComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private vc: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) {
    this.loadingFactory = this.resolver.resolveComponentFactory(IndeterminateProgressSpinnerComponent);
  }

  ngAfterContentInit() {
    if (!this.diameter) {
      const ref = this.vc.element.nativeElement.parentElement.offsetParent;

      const style = getComputedStyle(ref);
      let width = ref.clientWidth;
      let height = ref.clientHeight;

      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

      this.width = width;
      this.diameter = height;
    }
  }
}
