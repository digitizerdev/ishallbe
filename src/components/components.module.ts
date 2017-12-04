import { NgModule } from '@angular/core';
import { MediaComponent } from './media/media';
import { FacebookComponent } from './facebook/facebook';
import { HeaderComponent } from './header/header';
import { InteractionsComponent } from './interactions/interactions';

@NgModule({
	declarations: [
    MediaComponent,
    FacebookComponent,
    HeaderComponent,
    InteractionsComponent],
	imports: [],
	exports: [
    MediaComponent,
    FacebookComponent,
    HeaderComponent,
    InteractionsComponent]
})
export class ComponentsModule {}
