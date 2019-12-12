import { EmpresaService } from './../../services/empresa.service';
import { CargoService } from './../../services/cargo.service';
import { SetorService } from 'src/app/services/setor.service';
import { ColaboradorService } from './../../services/colaborador.service';
import { ColaboradorRoutes } from './colaborador.routing';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColaboradorComponent } from './colaborador.component';
import { EmailService } from 'src/app/services/email.service';
import { GerenciarEmailComponent } from './gerenciar-email/gerenciar-email.component';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ColaboradorRoutes),

        
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMaskModule,
        ColorPickerModule,
        MatCheckboxModule,
        FormsModule

    ],
    declarations: [
        ColaboradorComponent,
        GerenciarEmailComponent
    ],

    providers: [
        EmailService,
        ColaboradorService,
        SetorService,
        CargoService,
        EmpresaService
    ]
})

export class ColaboradorModule{}