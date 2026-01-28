package br.net.lls.componentes;

import java.util.Date;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.text.ParseException;

import org.joda.time.Days;
import org.joda.time.Months;
import org.joda.time.DateTime;

public class Data {
 
	public static String DataAtual() {
		
		SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
		
		Calendar calendar = Calendar.getInstance();
		
		return dataFormatada.format(calendar.getTime());
		
	}

	public static String HoraAtual() {
		
		SimpleDateFormat horaFormatada = new SimpleDateFormat("HH:mm:ss");
		
		Calendar calendar = Calendar.getInstance();
		
		return horaFormatada.format(calendar.getTime());
		
	}

	public static Calendar DateToCalendar(Date date) {
	
		Calendar cal = Calendar.getInstance();
		
		cal.setTime(date);
		
		return cal;
	
	}

	public static Date StringToDate(String data) {
	
		return StringToDate(data, "yyyy-MM-dd");
	
	}
	
	public static Date StringToDate(String data, String formato) {
	
		SimpleDateFormat dataFormatada = new SimpleDateFormat(formato);
		
		Date date = null;
		
		try {
		
			date = dataFormatada.parse(data);
			
		} catch (ParseException e) {
		
			date = null;
		
		}
	
		return date;
	
	}
	
	public static Calendar StringToCalendar(String data) {
	
		return DateToCalendar(StringToDate(data));
	
	}
	
	public static Calendar StringToCalendar(String data, String hora) {
	
		data += " " + hora;
	
		return DateToCalendar(StringToDate(data, "dd/MM/yyyy HH:mm:ss"));
	
	}
	
	public static int getDaysDiff(Date data1, Date data2) {
		
		DateTime dataInicio = new DateTime(data1).withTimeAtStartOfDay();
		DateTime dataFinal = new DateTime(data2).withTimeAtStartOfDay();
		
		Days d = Days.daysBetween(dataInicio, dataFinal);
		
		int days = d.getDays();
		
		return days;
		
	}
	
	public static boolean verificaMes(Date data1, Date data2) {
	
		DateTime dataInicio = new DateTime(data1).withTime(0, 0, 0, 0);
		DateTime dataFinal = new DateTime(data2).withTime(0, 0, 0, 0);
	
		int anoInicio = dataInicio.getYear();
		int anoFinal = dataFinal.getYear();
		
		int mesInicio = dataInicio.getMonthOfYear();
		int mesFinal = dataFinal.getMonthOfYear();
		
		if (mesInicio == mesFinal && anoInicio == anoFinal) {
			
			return true;
			
		}
		else {
			
			return false;
			
		}
		
	}
	
	public static int getMonthsBetween(Date data1, Date data2) {
	
		DateTime dataInicio = new DateTime(data1).withTime(0, 0, 0, 0);
		DateTime dataFinal = new DateTime(data2).withTime(0, 0, 0, 0);
	
		int months = Months.monthsBetween(dataInicio, dataFinal).getMonths();
		
		return months;
	
	}

	public static Calendar getLastDateOfMoth(Date today) {
		
		Calendar calendar = Calendar.getInstance();  
        
        calendar.setTime(today);  

        calendar.add(Calendar.MONTH, 1);  
        calendar.set(Calendar.DAY_OF_MONTH, 1);  
        calendar.add(Calendar.DATE, -1);  

		return calendar;
		
	}

	public static String getDataText(Calendar data) {
		return getDateFormat(data, 1);
	}

	public static String getDate(Calendar data) {
		return getDateFormat(data, 2); 
	}

	private static String getDateFormat(Calendar data, int tipo) {
		if (data != null) {
			
			String formato = "dd/MM/yyyy";
			if (tipo == 2) formato = "yyyy-MM-dd";
			
			SimpleDateFormat dataFormatada = new SimpleDateFormat(formato);
			dataFormatada.setCalendar(data);
			return dataFormatada.format(data.getTime());
		}
		else {
			 return "";
		}
	}
	
	public static String getHoraFormat(Calendar data) {
		if (data != null) {
			
			String formato = "HH:mm";
			
			SimpleDateFormat dataFormatada = new SimpleDateFormat(formato);
			dataFormatada.setCalendar(data);
			return dataFormatada.format(data.getTime());
		}
		else {
			 return "";
		}
	}
	
}
