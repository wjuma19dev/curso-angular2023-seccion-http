import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ItemComponent } from './components/list-group/item/item.component';
import { MomentPipe } from './pipes/moment.pipe';
import { PostService } from './services/post.service';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ListGroupComponent,
    ItemComponent,
    MomentPipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
