import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputPagePage } from './input-page.page';

describe('InputPagePage', () => {
  let component: InputPagePage;
  let fixture: ComponentFixture<InputPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
