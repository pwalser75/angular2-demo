import {Component, Input, OnInit} from "@angular/core";
import {GithubService} from "../../services/github.service";

@Component({
    selector: 'github-commits',
    templateUrl: 'templates/github-commits.html'
})
export class GithubCommitsComponent implements OnInit {

    @Input() url: string;
    commits: any;

    constructor(private githubService: GithubService) {
    }

    ngOnInit(): void {
        if (this.url) {
            this.githubService.getCommits(this.url)
                .subscribe(
                    data => this.commits = data,
                    error => console.log(error)
                );
        }
    }
}