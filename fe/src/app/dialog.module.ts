import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';

  
import { DialogComponent } from './dialog.component'; 
  
@NgModule({ 
  declarations: [DialogComponent], 
  entryComponents: [DialogComponent], 
  imports: [ 
    FormsModule, 
    MatButtonModule, 
    MatCommonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
  ], 
}) 
export class DialogModule {} 