import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'stn-modal',
  styleUrl: 'stn-modal.css',
  shadow: true,
})
export class StnModal {
@Prop() headerTitle:string="Modal Title"
@Prop() isOpen:boolean=false
@Prop({
    mutable:true,
    reflect:true,
}) 
@Prop() buttons:string

@Prop() customeClass:string

@State() _buttons:Array<any>

arrayDataWatcher(buttons){
    if(typeof buttons==='string'){
        this._buttons=JSON.parse(buttons);
    }
    else{
        this._buttons=buttons; 
    }
}

componentWillLoad(){
    this.arrayDataWatcher(this.buttons);
}

private closeModal =()=>{
    this.isOpen=false;
}

@Event() private action:EventEmitter<void>;

private actionModal=()=>{
 this.action.emit();
}
  render() {
    return (
      <div class={this.isOpen ? "modal-wrapper is-open" : "modal-wrapper"}>
        <div class="modal-overlay" />       
          <div class="modal">
            <div class="modal-header">
              <h5 class="modal-title">{this.headerTitle}</h5>
              <button type="button" onClick={this.closeModal} class="btn-close" ></button>
            </div>
            <div class="modal-body">
              <slot />
            </div>
            <div class="modal-footer">
              {this._buttons.map((button)=>{
                return <button class={`btn ${button.class}`} onClick={()=>button.text=='Cancel'?this.closeModal():this.actionModal()}>{button.text}</button>
              })}
            </div>
          </div>
        
      </div>
    );
  }
}
