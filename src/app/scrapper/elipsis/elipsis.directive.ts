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
    @Input('elipsis') private text:string;

    constructor(private el:ElementRef) {
    }

    ngOnChanges() {
        this.el.nativeElement.innerHTML = this.getText(this.text);
    }

    private getText(text:string):string {
        if (!text || text.length <= 150) {
            return text;
        }

        let newText = text;
        newText = newText.substring(0, 150) + '...';
        return newText;
    }
}