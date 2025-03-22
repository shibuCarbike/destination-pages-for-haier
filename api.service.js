import axios from "axios";
export const API_PORT = `${process.env.API_PORT}`;
const SERVER = `${process.env.API_PORT}/`;

const api = axios.create({
  baseURL: SERVER,
  timeout: 200000,
});

export default {
  getServer() {
    return SERVER;
  },

  globalSearchComparos(param) {
    return api.get(`searchComparosTv?q=${param}`);
  },

  getFetchCommonDataForAmpForTv() {
    return api.get(`commonAmpHomepageForTv`);
  },

  getTvModel(query) {
    let params = { _limit: -1, status_ne: "expired" };
    if (query) {
      params = { ...params, ...query };
    }
    return api.get(`tv-models`, { params: params });
  },

  getBrandModelsForTv(skip, limit, _sort, slug, query) {
    let params = { status: { $nin: ["expired", "upcoming"] } };
    
    if (query) {
      params = { ...params, ...query };
    }
    if (_sort) {
      params["_sort"] = _sort;
    }
    if (skip) {
      params["_skip"] = skip;
    }
    if (limit) {
      params["_limit"] = limit;
    }
    if (slug) {
      params["brandSlug"] = slug;
    }
    
    return api.get(`tv-models`, { params: params });
  },
  entityCount(query, model) {
    let params = {};
    if (query) {
      params = { ...params, ...query };
    }
    return api.get(model + "/count", { params: params });
  },

  generalFetchAmp(select, query, model, limit, sort, skip) {
    let params = {
      model,
      where: JSON.stringify(query),
      select,
      limit,
      sort: JSON.stringify(sort),
      skip,
    };
    return api.get(`generalFetchWithoutRedis`, { params });
  },

  getNews(limit, _sort, slug, locale, start, customParam) {
    let params = { newsFor_contains: "television" };
    if (_sort) {
      params["_sort"] = _sort;
    }
    if (limit) {
      params["_limit"] = limit;
    }
    if (slug) {
      params["slug"] = slug;
    }
    if (locale) {
      params["_locale"] = locale;
    }
    if (start) {
      params["_start"] = start;
    }

    if (customParam) {
      params = { ...params, ...customParam };
    }

    return api.get(`newsarticles`, { params: params });
  },

  generalFetchAmpWithoutRedis(select, query, model, limit, sort, skip) {
    let params = {
      model,
      where: JSON.stringify(query),
      select,
      limit,
      sort: JSON.stringify(sort),
      skip,
    };
    return api.get(`generalFetchWithoutRedis`, { params });
  },

  customerLead(body) {
    return api.post(`customer-leads`, body);
  },

  mailForLeadSend(body) {
    return api.post(`mailForLeadSend`, body);
  },
  getVideos(limit, _sort, customParam) {
    let params = {};
    if (_sort) {
      params["_sort"] = _sort;
    }
    if (limit) {
      params["_limit"] = limit;
    }
    if (customParam) {
      params = { ...params, ...customParam };
    }

    return api.get(`videos`, { params: params });
  },
};
