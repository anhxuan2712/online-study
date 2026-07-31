package com.dan.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

@Configuration
@Data
@NoArgsConstructor
public class CustomEnvironment {
    private PartnerInfo partnerInfo;
    private MoMoEndpoint endpoints;
    private String target;

    public CustomEnvironment(MoMoEndpoint endpoints, PartnerInfo partnerInfo, EnvTarget target) {
        this(endpoints, partnerInfo, target.string());
    }

    public CustomEnvironment(MoMoEndpoint momoEndpoint, PartnerInfo partnerInfo, String target) {
        this.endpoints = momoEndpoint;
        this.partnerInfo = partnerInfo;
        this.target = target;
    }

    /*
     *
     * @param target String target name ("dev" or "prod")
     * @return
     * @throws IllegalArgumentException
     */
    public static CustomEnvironment selectEnv(String target) throws IllegalArgumentException {
        return selectEnv(EnvTarget.DEV);
    }

    /*
     * Select appropriate Customenvironment to run processes
     * Create and modify your Customenvironment.properties file appropriately
     *
     * @param target EnvTarget (choose DEV or PROD)
     * @return
     */
    public static CustomEnvironment selectEnv(EnvTarget target) {

        switch (target) {
            case DEV:
                MoMoEndpoint devEndpoint = new MoMoEndpoint("https://test-payment.momo.vn/v2/gateway/api", "/create");
                PartnerInfo devInfo = new PartnerInfo("MOMOLRJZ20181206", "mTCKt9W3eU1m39TW", "SetA5RDnLHvt51AULf51DyauxUo3kDU6");
                CustomEnvironment devEn = new CustomEnvironment(devEndpoint, devInfo, target);

                return devEn;

            default:
                throw new IllegalArgumentException("MoMo doesnt provide other environment: dev and prod");
        }



    }

    public MoMoEndpoint getMomoEndpoint() {
        return endpoints;
    }



    public enum EnvTarget {
        DEV("development"), PROD("production");

        private String target;

        EnvTarget(String target) {
            this.target = target;
        }

        public String string() {
            return this.target;
        }
    }

    public enum ProcessType {
        PAY_GATE, APP_IN_APP, PAY_POS, PAY_QUERY_STATUS, PAY_REFUND, PAY_CONFIRM;

        public String getSubDir(Properties prop) {
            return prop.getProperty(this.toString());
        }
    }


}
