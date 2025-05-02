import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewtaskData } from '../task/task.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  providers: [ToastrService],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<NewtaskData>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  constructor(private readonly toastr: ToastrService) { }

  onCancel(from?: string) {
    if(from === "backdrop" &&
      (this.enteredTitle.trim().length !== 0 ||
        this.enteredSummary.trim().length !== 0 ||
        this.enteredDueDate.trim().length !== 0)
    ) {
      if (confirm("Are you sure you want to discard unsaved changes?")) {
        this.cancel.emit();
      }
    } else {
      this.cancel.emit();
    }
  }

  onSubmit() {
    if (this.enteredTitle.trim().length !== 0 || this.enteredSummary.trim().length !== 0) {
      this.addTask.emit({
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDueDate,
      });
    } else {
      alert('Please fill in the required fields');
      this.toastr.error('Please fill in the required fields', 'Error', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
