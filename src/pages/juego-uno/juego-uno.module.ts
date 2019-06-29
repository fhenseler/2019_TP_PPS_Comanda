import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JuegoUnoPage } from './juego-uno';

@NgModule({
  declarations: [
    JuegoUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(JuegoUnoPage),
  ],
})
export class JuegoUnoPageModule {}
