import { Component, Input } from '@angular/core';
import { Media } from '../media/service';
import { ElipsisDirective } from '../elipsis';

@Component({
    selector: 'media-container',
    styleUrls: ['./media.container.component.css'],
    templateUrl: './media.container.component.html'
})

export class MediaContainerComponent {
    @Input() public media: Media;
}
