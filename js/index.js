var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var months = 
["January","February","March","April","May","June","July","August","September","October","November", "December"];

generate_month();
// generate initial calender with current day
function generate_month(){
	first_day = new Date(year, month, 1);
	last_day = new Date(year, month + 1, 0);
	if ( (year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0)){
		feb_days = 29;
	}else{
		feb_days = 28;
	}
	dayPerMonth = [31, feb_days,31,30,31,30,31,31,30,31,30,31];
	month_values = month-1;
	if(month_values == -1){
		month_values = 11;
	}
	pre_month_days = dayPerMonth[month_values] - first_day.getDay()+1;
	var week_count = 0;
	calender = '<table class="border"><tbody><tr><th onclick="prev_month()"><</th><th colspan="5"><a href="#" onclick="view_month()">'+months[month]+'</a> <a href="#" onclick="view_year('+year+')">'+year+'</a></th><th onclick="next_month()">></th></tr><tr><td>Sunday</td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thrusday</td><td>Friday</td><td>Saturday</td></tr><tr>';

	for (var i = pre_month_days; i <= dayPerMonth[month_values]; i++) {
		calender = calender + "<td class='prev'>"+i+"</td>";
		week_count++;
	}
	for (var i = 1; i <= dayPerMonth[month]; i++) {
		calender = calender + "<td>"+i+"</td>";
		week_count++;
		if(week_count > 6){
			week_count = 0;
			calender = calender + "</tr><tr>";
		}
	}
	if(week_count){
		for (var i = week_count,j = 1; i < 7; i++,j++) {
			calender = calender + "<td class='next'>"+j+"</td>";
		}
	}
	document.getElementById('calender').innerHTML = calender;
}
// decrement to previous month
function prev_month(){
	month = month -1;
	if(month == -1){
		month = 11;
		year--;
	}
	generate_month();
}
// increment to next month
function next_month(){
	month = month + 1;
	if(month == 12){
		month = 0;
		year++;
	}
	generate_month();
}
// decrement to previous year
function prev_year(){
	year--;
	view_month();
}
// increment to next year
function next_year(){
	year++;
	view_month();
}
// handle month select in month view
function select_month(evt){
	month = months.indexOf(evt.target.innerHTML);
	generate_month();
}
// month view generation
function view_month(){
	month_view = '<table class="border"><tbody><tr><th onclick="prev_year()">&lt;</th><th colspan="2" id="year">'+year+'</th><th onclick="next_year()">&gt;</th></tr><tr><td class="month">January</td><td class="month">February</td><td class="month">March</td><td class="month">April</td></tr><tr><td class="month">May</td><td class="month">June</td><td class="month">July</td><td class="month">August</td></tr><tr><td class="month">September</td><td class="month">October</td><td class="month">November</td><td class="month">December</td></tr></tbody></table>';
	document.getElementById('calender').innerHTML = month_view;

	var select_months = document.getElementsByClassName('month');
	for (var i = 0; i < select_months.length; i++) {
		select_months[i].addEventListener('click', function(evt){
			select_month(evt);
		});
	}
}
// year view generation with after and before 10 years
function view_year(temp_start_year){
	var limit = 20;
	var temp_start = temp_start_year - 10;
	year_view = '<table class="border"><tbody><tr><th onclick="prev_decade_year('+temp_start+')">&lt;</th><th colspan="3" id="year">'+temp_start+"-"+(temp_start_year+9)+'</th><th onclick="next_decade_year('+(temp_start_year+9)+')">&gt;</th></tr><tr>';
	for (var i = 0,j = 0; i < limit; i++) {
		year_view = year_view + '<td class="year">'+(temp_start+i)+'</td>';
		j++;
		if(j == 5){
			year_view = year_view + '</tr><tr>';
			j = 0;
		}
	}
	document.getElementById('calender').innerHTML = year_view;

	var select_years = document.getElementsByClassName('year');
	for (var i = 0; i < select_years.length; i++) {
		select_years[i].addEventListener('click', function(evt){
			select_year(evt);
		});
	}	
}
// handle year select
function select_year(evt){
	year = evt.target.innerHTML;
	view_month();
}
// handle next decade click
function next_decade_year(temp_year){
	view_year(temp_year);
}
// handle next decade click
function prev_decade_year(temp_year){
	view_year(temp_year);
}
