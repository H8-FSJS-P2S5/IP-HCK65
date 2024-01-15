npx sequelize-cli model:generate --name User --attributes fullName:string,email:string,password:string 


npx sequelize-cli model:generate --name Genre --attributes genre:string

npx sequelize-cli model:generate --name Movies --attributes title:string,description:string,Stars:string,GenreId:integer,images:string,year:integer

npx sequelize-cli model:generate --name Review --attributes name:string,headline:string,review:string,UserId:integer,MovieId:integer