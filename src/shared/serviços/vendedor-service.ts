import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Vendedor } from '../modelos/vendedor-model';

@Injectable({
    providedIn: 'root',
})
export class VendedorService {
    URL_VENDEDORES = 'http://localhost:8080/vendedores';

    constructor(private httpClient: HttpClient) {}

    cadastrar(vendedor: Vendedor): Observable<Vendedor> {
        return this.httpClient.post<Vendedor>(this.URL_VENDEDORES, vendedor);
    }

    listar(): Observable<Vendedor[]> {
        return this.httpClient.get<Vendedor[]>(this.URL_VENDEDORES);
    }

    buscar(id: string): Observable<Vendedor> {
        return this.httpClient.get<Vendedor>(this.URL_VENDEDORES + '/' + id);
    }

    editar(vendedor: Vendedor): Observable<Vendedor> {
        return this.httpClient.put<Vendedor>(
        this.URL_VENDEDORES + '/' + vendedor.id,
        vendedor
        );
    }

    remover(vendedor: Vendedor): Observable<Vendedor> {
        return this.httpClient.delete<Vendedor>(
        this.URL_VENDEDORES + '/' + vendedor.id
        );
    }

    buscarPorEmail(email: string): Promise<Vendedor | null | undefined> {
        return this.httpClient.get<Vendedor[]>(this.URL_VENDEDORES + '?email=' + email).pipe(
            map((vendedores: Vendedor[]) => {
                return vendedores.length > 0 ? vendedores[0] : null;
            })
        ).toPromise();
    }

    // validarLogin(email: string, password: string) {
    //     if (email == '' || password == '') {
    //         throw new Error('Preencha todos os campos');
    //     }
    //     this.buscar(email).subscribe({
    //         next: usuario =>
    //              {
    //             if (usuario.senha == password) {
    //                 return usuario;
    //             }
    //             else {
    //                 throw new Error('Usuário ou senha inválidos!');
    //             }
    //     }});
    // }

    validarLogin(email: string, password: string) {
        // if (email == '' || password == '') {
        //             throw new Error('Preencha todos os campos');
        //         }
        return new Promise<Vendedor>((resolve, reject) => {

            const login = {
                email: email,
                senha: password,
            };

            this.httpClient.post<Vendedor>(this.URL_VENDEDORES + '/login', login).subscribe({
                next: (vendedor) => {
                    if (vendedor != null) {
                        resolve(vendedor);
                    } else {
                        reject(new Error('Usuário ou senha inválidos!'));
                    }
                },
                error: () => {
                    reject(new Error('Usuário ou senha inválidos!'));
                },
            });

            // this.buscarPorEmail(email).subscribe({ // o objeto retornado nao possui senha
            //     next: (usuario) => {
            //         if (validarAutenticacao(usuario, password)) {
            //             resolve();
            //         } else {
            //             reject(new Error('Usuário ou senha inválidos!'));
            //         }
            //     },
            /////////////////////////////////////////////////////////////////////////////////////
            // this.buscar(email).subscribe({
            //     next: (usuario) => {
            //         if (usuario.senha == password) {
            //             resolve();
            //         } else {
            //             reject(new Error('Usuário ou senha inválidos'));
            //         }
            //     },
            //     error: () => {
            //         reject(new Error('Usuário ou senha inválidos'));
            //     },
            // });
        });
    }
}
