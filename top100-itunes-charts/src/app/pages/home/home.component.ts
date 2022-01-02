import {Component, OnInit} from '@angular/core';
import {AlbumsService} from "../../../services/albums.service";
import {Entry} from "../../../models/topalbums";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  albums: Entry[];
  albumsDisplayed: Entry[];
  searchTerm: string;

  constructor(private albumsService: AlbumsService) {
  }

  ngOnInit(): void {

    // Get albums from iTunes API
    this.albumsService.getAlbumsData().subscribe(data => {
      this.albums = data;
      this.albumsDisplayed = data;
    });
  }

  // Search for respective search term
  search() {
    if (!this.searchTerm || this.searchTerm === "") {
      this.albumsDisplayed = this.albums;
      return;
    }

    const searched = this.searchTerm?.toUpperCase();

    this.albumsDisplayed = this.albums?.filter(album => album['im:name'].label.toUpperCase().includes(searched))
  }
}
