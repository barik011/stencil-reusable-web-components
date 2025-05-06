import { Component, Prop, h,Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'stn-button',
  styleUrl: 'stn-button.sass',
  shadow: true,
})
export class MyButton {
  @Prop() label: string = 'Click Me';
  @Prop() type: 'button' | 'submit' = 'button';
  @Prop() disabled: boolean = false;
  @Prop() icon: boolean = false; // Icon URL
  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';


  @Event() buttonClicked: EventEmitter<void>; // Custom event

  handleClick() {
    if (!this.disabled) {
      this.buttonClicked.emit(); // Emit event when clicked
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