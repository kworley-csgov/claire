package com._42six.claire.client.topsy;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.http.client.ClientProtocolException;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import com._42six.claire.openfda.util.OpenFDAUtil;

/**
 * Integration tests for the Topsy client
 */
public class TopsyClientTest {

	private TopsyClient client;

	public TopsyClientTest() {
	}

	@Before
	public void setup() throws ClientProtocolException, IOException {
		TopsyProperties props = new TopsyProperties(new File("src/test/resources/topsy.properties"));
		this.client = new TopsyClient(props.getProperty(TopsyProperties.FIELD_API_KEY));
	}

	/**
	 * Search all drugs in Topsy for a specified date range and stream tweets to a
	 * directory on disk.
	 * The resulting tweets can then be used to score via sentiment analysis.
	 * This is ignored at build time.
	 * 
	 * @throws Exception
	 */
	@Ignore
	@Test
	public void executeClient() throws Exception {
		String startDateStr = "2014-06-01 000000";
		String endDateStr = "2014-06-30 235959";

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HHmmss");
		Date startDate = dateFormat.parse(startDateStr);
		Date endDate = dateFormat.parse(endDateStr);

		for (String searchString : OpenFDAUtil.DRUG_NAMES) {
			this.client.search(searchString, new File("/tmp/topsy"), startDate, endDate);
		}
	}

	@After
	public void teardown() throws IOException {
		this.client.close();
	}

}
