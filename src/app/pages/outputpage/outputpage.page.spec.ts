import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutputpagePage } from './outputpage.page';

describe('OutputpagePage', () => {
  let component: OutputpagePage;
  let fixture: ComponentFixture<OutputpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutputpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
