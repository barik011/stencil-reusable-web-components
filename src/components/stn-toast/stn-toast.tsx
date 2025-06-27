import { Component,Prop,State,Method,h } from "@stencil/core";

@Component({
    tag:'stn-toast',
    styleUrl:'stn-toast.css',
    shadow:true,
})

export class StnToast{
    @Prop() message:string;
    @Prop() customClass:string='';
    @Prop() isClosable:boolean=true;
    @Prop() type:'info' | 'success' |'failure' | 'warning' = 'info';
    @Prop({mutable:true}) autoClose?:number | null = 3000;
    @Prop() titleTxt?:string;
    @State() isVisible:boolean=false;

    private autoHideTimer:number;

    @Method()
    async presentToast(message:sting,
        type:'info' | 'success' |'failure' | 'warning',
        titleTxt?:string,
        duration?:number){
            this.titleTxt=titleTxt;
        this.message=message;
        this.type=type;
        this.isVisible=true;
        this.autoClose=duration;
        //Clear any existing timer
        if(this.autoClose){
            clearTimeout(this.autoHideTimer);
            this.autoHideTimer = window.setTimeout(()=> this.dismissToat(),this.autoClose) as unknown as number;
        }
    }
    @Method()
    async dismissToat(){
        this.isVisible=false;
        clearTimeout(this.autoHideTimer);
    }
    renderCloseButton(){
        return(
            <button class="close-button" onClick={()=>this.dismissToat()}>&nbsp;</button>        )
    }
    renderTitle(){
        return this.titleTxt ? <div class="toast-title">{this.titleTxt}</div>:null;
    }
    
    render(){
        const classes ={
            'toast':true,
            'toast-visible':this.isVisible,
            'toast-invisible':this.isVisible==false,
            [this.customClass]:!!this.customClass,
        }

        return (
            <div class={classes}>
                <div class='toast-title-wraper'>
                <div class={`toast-${this.type}`}>&nbsp;</div>
                <div class="toast-message">
                    <div>
                        {this.renderTitle()}
                    </div>
                    {this.isClosable && <div class='clsbtn'>{this.renderCloseButton()}</div>}
                </div>
            </div>
            <p class='lbltxtdesc'>{this.message}</p>
            </div>
        );
    }
}