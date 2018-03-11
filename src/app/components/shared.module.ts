import { LanguagePipe } from './../pipes/language.pipe';
import { ValidationDirective } from './../directives/validation.directive';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
    ],
    declarations: [
        ValidationDirective,
        LanguagePipe,
],
    exports: [
        ValidationDirective,
        LanguagePipe,
    ]
})
export class SharedModule { }