import { Component, Prop, h,Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'stn-button',
  styleUrl: 'stn-button.css',
  shadow: true,
})
export class StnButton {
  @Prop() label: string = 'Click Me';
  @Prop() type: 'button' | 'submit' = 'button';
  @Prop() disabled: boolean = false;
  @Prop() icon: boolean = false; // Icon URL
  @Prop() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'light' | 'link' | 'outline' | 'danger' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({
        mutable:true,
        reflect:true,
        })                            

  @Event({ bubbles: true, composed: true }) action: EventEmitter<void>; // Custom event

  handleClick() {
    if (!this.disabled) {
      this.action.emit(); // Emit event when clicked
    }
  }

  render() {
    return (
      <button 
        type={this.type} 
        disabled={this.disabled} 
        class={`${this.variant} ${this.size}`}
        onClick={() => this.handleClick()}>           
        {this.icon && <span class="button-icon"></span>}
        {this.label}
      </button>
    );
  }
}