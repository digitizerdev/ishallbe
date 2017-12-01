import { NgModule } from '@angular/core';
import { PinsComponent } from './pins/pins';
import { PinComponent } from './pin/pin';
import { PostsComponent } from './posts/posts';
import { PostComponent } from './post/post';
import { MediaComponent } from './media/media';
import { FacebookComponent } from './facebook/facebook';
import { UsersComponent } from './users/users';
import { CommentsComponent } from './comments/comments';
import { HeaderComponent } from './header/header';
@NgModule({
	declarations: [PinsComponent,
    PinComponent,
    PostsComponent,
    PostComponent,
    MediaComponent,
    FacebookComponent,
    UsersComponent,
    CommentsComponent,
    HeaderComponent],
	imports: [],
	exports: [PinsComponent,
    PinComponent,
    PostsComponent,
    PostComponent,
    MediaComponent,
    FacebookComponent,
    UsersComponent,
    CommentsComponent,
    HeaderComponent]
})
export class ComponentsModule {}
