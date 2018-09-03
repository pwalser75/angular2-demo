import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class GithubService {

    constructor(private http: HttpClient) {
    }

    getCommits(githubUrl: string): Observable<Response> {

        return this.http.get<Response>(githubUrl + '/commits');
    }
}