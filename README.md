[Power Progress App Testing](https://powerprogress.herokuapp.com)

# PowerProgress

PowerProgress is a MERN stack app designed to help lifters and coaches find a one-stop-shop platform to see programs, track progress, and analyze how a lifter performs over time based on given stimuli. 

## 12/30/2021

Currently the primary objective is functionality, simple security faetures will be added soon. Additionall github pages/aws link will be posted soon hopefully.

## 1/1/2022

Uploading a MERN stack app to Heroku/github pages/aws is a lot more challenging than I'd originally hoped. Current next steps are adding google sheets/mongodb communication and functionality

## 1/7/2022

Ended up using a JS library to store program sheets in. Sheets are able to be updated on the user and server end, as well as perform basic spreadsheet functions. The data is able to converted directly into a visualized form in the user's "block" page.

Successfully deployed to Heroku!! Next step is to make the site/navbar functional on a phone.

## 1/19/2022

Ended up figuring out the scroll issue, so datapoints in the table for each block is not taking up the entire page. The actual style still needs much work, but the spreadsheet will fairly consistently autosave whenever clicked outside of the table and update the database with any changes. Currently a very slow way of doing things, but will be made more efficient soon.

## 2/3/2022

All the primary details have been fixed. Still some styling improvements to be done, but otherwise very happy with this semi-finished product. Users can have multiple training blocks, all with unique program sheets and an example sheet to display how workout program should be written to be processed correctly. 

### Next implementations

1. Security features
2. Styling
3. Mobile friendliness
