# PowerProgress

PowerProgress is a MERN stack app designed to help lifters and coaches find a one-stop-shop platform to see programs, track progress, and analyze how a lifter performs over time based on given stimuli. 

## 12/30/2021

Currently the primary objective is functionality, simple security faetures will be added soon. Additionall github pages/aws link will be posted soon hopefully.

## 1/1/2021

Uploading a MERN stack app to Heroku/github pages/aws is a lot more challenging than I'd originally hoped. Current next steps are adding google sheets/mongodb communication and functionality

### Goals

1. Connect MongoDB Atlas to google sheets by using Google App and MongoDB stitch.
2. Back to front functionality. A change on the app should change the sheet and a change in the sheet should change the app.
3. Differentiation of top sets and working sets. A boolean parameter in the exercises document will help with this. Try differentiating with highlight colors as a marker.
4. Make database updates more specific. Multiple weeks of programming can happen in a single sheet, should not add duplicate workouts. Find a way to either track specifc workouts, or just check for uniqueness. Using explicite weeks could help differentiate greately as week-to-week comparisons can sometimes be the same and get confused as the same entry.
