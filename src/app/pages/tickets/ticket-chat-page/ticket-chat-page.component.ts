import { Router, ActivatedRoute } from "@angular/router";
import { Ticket } from "./../../../models/ticket";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

declare var $: any;

@Component({
  selector: "app-ticket-chat-page",
  templateUrl: "./ticket-chat-page.component.html",
  styleUrls: ["./ticket-chat-page.component.scss"]
})
export class TicketChatPageComponent implements OnInit {
  selectTicket: Ticket;

  fileGroup = this._fb.group({
    file: [null, Validators.required]
  });

  loadedFile: any;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  onFileChange(event) {
    let reader = new FileReader();

    const [file] = event.target.files;

    if (event.target.files && event.target.files.length) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.loadedFile = reader.result;
        $("#imagePreviewModal").modal("show");

        this.cd.markForCheck();
      };
    }
  }

  sendImage() {
    $("#imagePreviewModal").modal("hide");
  }

  sendMessage() {
    alert("mensagem enviada");
  }

  loadChatMessages() {}

  enterListerner(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
      
    }
    return;
  }
}
