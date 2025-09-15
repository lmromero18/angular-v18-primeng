import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class PrimeNgNotificationService {
  constructor(private messageService: MessageService) {}

  public createMessage({
    severity,
    summary,
    detail,
  }: {
    severity: "success" | "info" | "warn" | "error";
    summary: string;
    detail?: string;
  }) {
    this.messageService.add({ severity, summary, detail });
  }
}
