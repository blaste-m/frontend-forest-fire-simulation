import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor() { }

  private http = inject(HttpClient)

  public async getSimulation(request?: SimulationRequest) {
    return await firstValueFrom(
      this.http.get<number[][][]>(
      '/api/v1/simulation',
        {
          params: {
            ...request
          }
        }
      )
    )
  }

}

export interface SimulationRequest {
  width?: number,
  height?: number,
  probab?: number,
  indexI?: number,
  indexJ?: number
}
