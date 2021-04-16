import { Component, Inject, VERSION } from '@angular/core'; 
import { MatDialogRef } from '@angular/material/dialog'; 
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { version } from "../../package.json" 
import { name } from "../../package.json" 
  
@Component({ 
  selector: 'app-dialog', 
  templateUrl: 'dialog.component.html', 
}) 
export class DialogComponent { 
  
  AngularVersion = VERSION.full;
  Version: string = version;
  Name: string = name;
  
  constructor( 
    public dialogRef: MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { } 
  
  onClose(): void { 
    this.dialogRef.close(); 
  } 
  
}