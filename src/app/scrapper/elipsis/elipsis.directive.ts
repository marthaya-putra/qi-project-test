import {
    Component,
    Directive,
    ElementRef,
    Renderer,
    OnChanges,
    Input
} from '@angular/core';

@Directive({
    selector: '[elipsis]'
})

export class ElipsisDirective implements OnChanges {
    constructor(private el:ElementRef) {
    }

    @Input('elipsis') text: string;

    ngOnChanges(){
        this.el.nativeElement.innerHTML = this.getText(this.text);
    }

    private getText(text:string):string {
        if (!text || text.length <= 150)
            return text;

        text = text.substring(0, 150) + '...';
        return text;
    }
}