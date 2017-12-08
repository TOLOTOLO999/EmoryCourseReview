const path = require('path');
var Course=require(path.join(__dirname,'..','/models/course.js'));
var Rating = require(path.join(__dirname,'..','/models/ratings.js'));

module.exports = function(res, query_string) {
    console.log(query_string['prof']);
    var prof_id= query_string['prof'].replace("_",", ");
    
    var total_difficulty=0;
    var total_overall=0;
    var total_workload=0;
    var this_resp = [];
    Course.find({'professors': prof_id}, function(err, courses) {
        if (err) {
            // findOne error
            res.json({error: err});
        } else {
            if (courses) {
                // Course found
                console.log(courses);
                var count=courses.length;
                var numSections=count;

                courses.forEach(function(courseItem) {
                    // Find matching rating
                    Rating.findOne({'class_id': courseItem.course_num, 'prof_id': prof_id}, function(err, rating) {
                        if(err){
                          return next(err)
                        }
                        if (!rating) {
                            // error finding a rating
                            var course_professor_rating = {
                                course_num: courseItem.course_num,
                                course_name: courseItem.course_name,
                                average_difficulty: null,
                                average_overall: null,
                                average_workload: null
                            }
                            // add card to response
                            sendcprof(course_professor_rating, false);


                        } else {
                            var course_professor_rating = {
                                course_num: courseItem.course_num,
                                course_name: courseItem.course_name,
                                average_difficulty: (rating.total_difficulty / rating.rating_count).toFixed(2),
                                average_overall: (rating.total_overall / rating.rating_count).toFixed(2),
                                average_workload: (rating.total_workload / rating.rating_count).toFixed(2)
                            }
                            // add card to response
                            sendcprof(course_professor_rating, true);
                        }

                    });
                })
                
            } 

            else {
                // Course not found, show 404 or something
                res.json({message: 'course not found'});
                //res.redirect('/404');
            }
        }

        // Pass data to sendJson
        function sendcprof(send, add) {
            if(add)
            {
                total_overall+=send.average_overall;
                total_workload+=send.average_workload;
                total_difficulty+=send.average_difficulty;
            }
            else
            {
                numSections--;
            }
            this_resp.push(send);
            count--;
            if(count==0)
            {
                res.json({
                    professor: prof_id,
                    prof_avg_overall: (total_overall/numSections).toFixed(2),
                    prof_avg_difficulty: (total_difficulty/numSections).toFixed(2),
                    prof_avg_workload: (total_workload/numSections).toFixed(2),
                    courses: this_resp
                });
            }
        }

    });

    
};
