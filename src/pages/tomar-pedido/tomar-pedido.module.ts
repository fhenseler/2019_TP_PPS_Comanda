import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TomarPedidoPage } from './tomar-pedido';

//import { rxsj } from 'ionic/rxjs/;

@NgModule({
  declarations: [
    TomarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(TomarPedidoPage),
  ],
})
export class TomarPedidoPageModule {}
