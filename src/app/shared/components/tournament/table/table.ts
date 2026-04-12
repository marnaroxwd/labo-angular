import { Component, input, output } from '@angular/core';
import { Button } from '../../button/button';
import { TableColumn } from './models/table.interface';
import { Links } from "../../links/links";

@Component({
    selector: 'app-table',
    imports: [Button, Links],
    templateUrl: './table.html',
    styleUrl: './table.css',
})
export class Table {
columns = input.required<TableColumn[]>();
    data = input.required<any[]>();
    
    clickEdit = output<any>();
    clickDelete = output<any>(); // Émet l'objet complet

    onEdit(row: any): void {
        this.clickEdit.emit(row);
    }

    onDelete(row: any): void {
        this.clickDelete.emit(row); // Envoie le tournoi au parent
    }
        getCellValue(key: string, id: number): unknown {
        const test = this.data();
        return test[id][key];
    }
}
