import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-loan-comment',
  templateUrl: './loan-comment.component.html',
  styleUrls: ['./loan-comment.component.scss']
})
export class LoanCommentComponent implements OnInit {

  isSubmitted = false;
  user :any = {};


  @Input() value!: string | number;
  @Input() rowData!: any;
  
  @Input() context = '';
  @Input() title = '';

  constructor(
    public dialogRef: NbDialogRef<LoanCommentComponent>,
  ) { }

  ngOnInit(): void {
  }

  
  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(this.user);
  }

}
