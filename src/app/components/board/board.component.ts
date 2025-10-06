import {Component, computed, inject, signal} from '@angular/core';
import {SimulationRequest, SimulationService} from '../../services/simulation.service';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-board',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
  ],
  providers: [
    SimulationService
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  private readonly simulationService = inject(SimulationService);

  protected sigBoards = signal<number[][][]>([])
  protected activeBoardIndex = signal(0);

  protected width = signal(6)
  protected height = signal(6)
  protected indexJ = signal(0)
  protected indexI = signal(0)
  protected probab = signal(0.5)

  private params = computed<SimulationRequest>(() => ({
    width: this.width(), height: this.height(), probab: this.probab(),
    indexI: this.indexI(), indexJ: this.indexJ()
    })
  )

  protected async getSimulation() {
    const data = await this.simulationService.getSimulation(
      this.params()
    )
    this.activeBoardIndex.set(0)
    this.sigBoards.set(data)
  }

  protected incrementActiveBoardIndex() {
    if (this.activeBoardIndex() < this.sigBoards().length - 1)
      this.activeBoardIndex.update(i => i + 1)
  }

  protected decrementActiveBoardIndex() {
    if (this.activeBoardIndex() > 0)
      this.activeBoardIndex.update(i => i - 1)
  }

}
