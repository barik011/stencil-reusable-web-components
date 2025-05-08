import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'stn-right-offcanvas',
  styleUrl: 'stn-right-offcanvas.css',
  shadow: true
})
export class RightModal {
  @Prop() modalTitle: string = 'Modal Title';
  @Prop() width: string = '400px';
  @Prop() closeButton: boolean = true;
  @Prop() footerButtons: { label: string, type: string }[] = []; // Accepts a list of buttons dynamically

  @State() isOpen: boolean = false;

  @Event({ bubbles: true, composed: true }) modalClosed: EventEmitter<void>;
  @Event({ bubbles: true, composed: true }) modalOpened: EventEmitter<void>;
  @Event({ bubbles: true, composed: true }) buttonClicked: EventEmitter<string>; // Emits button label when clicked

  openModal=()=> {
    this.isOpen = true;
    this.modalOpened.emit();
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
  }

  handleButtonClick(label: string) {
    this.buttonClicked.emit(label);
  }

  render() {
    return (
      <div class={`modal-overlay ${this.isOpen ? 'show' : ''}`}>
        <div class="modal-content" style={{ width: this.width }}>
          <header>
            <h3>{this.modalTitle}</h3>
            {this.closeButton && <button class="close-btn" onClick={() => this.closeModal()}>✖</button>}
          </header>
          <slot/>
          <footer>
            {this.footerButtons.map(button => (
              <button class={`btn ${button.type}`} onClick={() => this.handleButtonClick(button.label)}>
                {button.label}
              </button>
            ))}
          </footer>
        </div>
      </div>
    );
  }
}
