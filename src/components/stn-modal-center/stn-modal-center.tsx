import { Component,Prop,State,Method,Event,EventEmitter,h } from "@stencil/core";

@Component({
    tag:'stn-modal-center',
    styleUrl:'stn-modal-center.css',
    shadow:true,
})

export class StnModalCenter{
    @Prop() headerTitle:string="Default Title";
    @Prop() showFooter:boolean=true;
    @State() showModal:boolean=false;
    @State() animationState:'slide-in-bottom' | 'slide-out-bottom' = 'slide-in-bottom';
    @Event() close:EventEmitter<void>;

    @Method()
    async openModal(){
        this.showModal = true;
        this.animationState= 'slide-in-bottom';
    }
    @Method()
    async closeModal(){
        this.animationState='slide-out-bottom';
        setTimeout(()=>{
            this.showModal=false;
            this.close.emit();
        },500);
    }

    render(){
        return (
            <div class={{'modal':true, 'show-modal' :this.showModal}}>
                <div class={{'modal-content':true, [this.animationState]: true}}>                    
                    <div class="modal-header">
                        <div class="header-text">{this.headerTitle}</div>
                        <span class='close-button' onClick={()=>this.closeModal()}>&nbsp;</span>
                    </div>

                    <div class="modal-body">
                        <slot name="modal-content"></slot>
                    </div>
                    {this.showFooter && (<div class="modal-footer">
                        <slot name="modal-footer"></slot>
                    </div>)}
                </div>
                <div class="modal-overlay" onClick={()=>this.closeModal()}></div>
            </div>
        );
    }
}