import { NgModule } from '@angular/core';
import { MediaComponent } from './media/media';
import { FacebookComponent } from './facebook/facebook';
import { HeaderComponent } from './header/header';
import { FormComponent } from './form/form';
import { InteractionsComponent } from './interactions/interactions';

@NgModule({
	declarations: [
    MediaComponent,
    FacebookComponent,
    HeaderComponent,
    FormComponent,
    InteractionsComponent],
	imports: [],
	exports: [
    MediaComponent,
    FacebookComponent,
    HeaderComponent,
    FormComponent,
    InteractionsComponent]
})
export class ComponentsModule {}
