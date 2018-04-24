import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books;
  public houses;
  public character;
  public allInOne = [];
  public final;
  public setChar = [];
  public i;
  public j;
  public k;
  public inputValue: string = "ascending";
  public categoryValue: string = "Select";
  public textValue: string = "";
  p: number = 1;

  constructor(private series: SeriesService, private spinnerService: Ng4LoadingSpinnerService) {
    console.log("Home component called");
  }

  ngOnInit() {
    this.spinnerService.show();
    for(this.i =1;this.i<13;this.i++)  {
    this.books = this.series.getBooks(this.i).subscribe(   //this is getting book data
      data => {

        this.books = data;
        console.log('books')
        console.log(data)

        this.all(this.books);
      },
      error => {
        console.log(error.errorMessage);
       
      });}

      for(this.j =1;this.j<445;this.j++)  {
        this.houses = this.series.getHouse(this.j).subscribe(     //this is getting house data
          data => {
    
            this.houses = data;
            console.log('houses')
            console.log(data)
    
            this.all(this.houses);
    
          },
          error => {
            console.log(error.errorMessage);
           
          });}
    
          

         /* for(this.k =1;this.k<2140;this.k++)  {
            this.character = this.series.getCharacter(this.k).subscribe(          //this is getting character data
              data => {
        
                this.character = data;
                console.log('characters')
                console.log(data)
                this.setChar = this.setCharName(this.character);
                this.all(this.setChar);
        
        
              },
              error => {
                console.log(error.errorMessage);
               
              }); }*/


              for(this.k =1;this.k<2140;this.k++)  {
                this.character = this.series.getCharacter(this.k).subscribe(     //this is getting house data
                  data => {
            
                    this.character = data;
                    console.log('characters')
                    console.log(data)
            
                    this.setChar = this.setCharName(this.character);
                    this.all(this.setChar);
            
                  },
                  error => {
                    console.log(error.errorMessage);
                   
                  });}


   

  }

  //method to concat all data in one variable
  public all = (data): any => {                      //this is getting evry data in one variable
    this.allInOne.push(data);
    setTimeout(() => {
      this.spinnerService.hide();
      this.final = [].concat(...this.allInOne);
    }, 2000);

  }


   /* To store alias name in character name which is empty
   public setCharName = (data1): any => {
    console.log('setchar called')
    console.log(data1.aliases)
    for (let character of data1) {
      
    // console.log(character.name.length)
      if (character.name.length == 0) {
        alert('name empty')
        character.name = character.aliases[0];
        console.log(character.name);
        
      }
    }
    return data1;
  }*/


 // To store alias name in character name which is empty
  public setCharName = (data1): any => {
    console.log('setchar called')
    console.log(data1.aliases)
   
      
    // console.log(character.name.length)
      if (data1.name.length == 0) {
        data1.name = data1.aliases[0];
        console.log(data1.name);
        
      }
    
    return data1;
  }









  //for making first letter capital
  public capital = (a: string): string => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }; //end

  //for getting id of categories like character,house,books
  public getId = (a: string): string => {
    let pos = a.lastIndexOf('/');
    let id = a.substr(pos + 1);
    return id;
  }; //end

 
}