import { ComponentFixture, TestBed } from '@angular/core/testing';
import gsap from 'gsap';
import { PanierComponent } from './panier.component';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PanierComponent]
    });
    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
