import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Links } from "../../../../shared/components/links/links";
import { TournamentService } from '@core/services/tournament.service';
import { PaginatedResponse } from '@core/models/api-response.interface';
import { Tournament } from '@core/models/tournament.interface';
import { Table } from "../../../../shared/components/tournament/table/table";
import { TableColumn } from '../../../../shared/components/tournament/table/models/table.interface';
import { DeleteModal } from "../../../../shared/components/tournament/delete-modal/delete-modal";

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [RouterLink, Links, Table, DeleteModal],
    templateUrl: './dashboard-page.html',
    styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _raw = signal<null | PaginatedResponse<Tournament>>(null);
  
  // Signal de contrôle de la modal
  tournamentToDelete = signal<Tournament | null>(null);

  tournaments = computed(() => {
    const response = this._raw();
    if (!response) return [];
    return response.data.map(t => ({
      ...t,
      eloRange: `${t.eloMin} - ${t.eloMax}`,
      playerRange: `${t.playerMin} - ${t.playerMax}`
    }));
  });

  columns: TableColumn[] = [
    { key: "id", label: "Id" }, { key: "name", label: "Nom" },
    { key: 'location', label: 'Lieu' }, { key: 'playerRange', label: 'Joueurs' },
    { key: 'eloRange', label: 'Elo' }, { key: 'status', label: 'Status' }
  ];

  async ngOnInit() { await this.loadData(); }

  async loadData() {
    this._raw.set(await this._tournamentService.listing());
  }

  // Ouvre la modal en stockant l'objet
  handleDeleteClick(tournament: Tournament) {
    this.tournamentToDelete.set(tournament);
  }

  // Confirmation finale
  async onConfirmDelete() {
    const t = this.tournamentToDelete();
    if (t) {
      await this._tournamentService.delete(t.id.toString());
      this.tournamentToDelete.set(null);
      await this.loadData();
    }
  }
}