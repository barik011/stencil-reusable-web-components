import { Component,Prop,State,Method,Event,EventEmitter,h } from "@stencil/core";

@Component({
    tag:'stn-modal-slide',
    styleUrl:'stn-modal-slide.css',
    shadow:true,
})

export class StnModalSlide{
    @Prop() headerTitle:string="Default Title";
    @Prop() showFooter:boolean=true;
    @State() showModal:boolean=false;
    @State() animationState:'slide-in-right' | 'slide-out-right' = 'slide-in-right';
    @Event() close:EventEmitter<void>;
    @Event() confirm:EventEmitter<void>;
    @Prop() isConfirm:boolean=false;

    @Method()
    async openModal(){
        this.showModal = true;
        this.animationState= 'slide-in-right';
    }
    @Method()
    async closeModal(){
        this.animationState='slide-out-right';
        setTimeout(()=>{
            this.showModal=false;
            this.close.emit();
        },500);
    }
    @Method()
    async confirmModal(){
        setTimeout(() => {
            this.confirm.emit();
        }, 500);
    }

    render(){
        return (
            <div class={{'modal':true, 'show-modal' :this.showModal}}>
                <div class={{'modal-content':true, [this.animationState]: true}}>
                    <slot name="header"></slot>
                    <div class="modal-header">
                        <div class="header-text">{this.headerTitle}</div>
                        {this.isConfirm ? <span class="close-button" onClick={()=>this.confirmModal()}>&nbsp;</span>:<span class='close-button' onClick={()=>this.closeModal()}>&nbsp;</span>}
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