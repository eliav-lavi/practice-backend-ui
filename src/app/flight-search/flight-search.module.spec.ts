import { FlightSearchModule } from './flight-search.module';

describe('FlightSearchModule', () => {
  let flightSearchModule: FlightSearchModule;

  beforeEach(() => {
    flightSearchModule = new FlightSearchModule();
  });

  it('should create an instance', () => {
    expect(flightSearchModule).toBeTruthy();
  });
});
