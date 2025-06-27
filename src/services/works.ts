import api from "@/plugins/api";

class WorkService {
  private handleError(error: any, action: string) {
    console.error(`Error during ${action}:`, error);
    throw new Error(`Failed to ${action} work`);
  }

  async sendWork(work: any) {
    try {
      const { data } = await api.post("/work/", work);
      return data;
    } catch (error) {
      this.handleError(error, "create");
    }
  }

  async getWork(id: string) {
    try {
      const { data } = await api.get(`/work/${id}/`);
      return data;
    } catch (error) {
      this.handleError(error, "fetch");
    }
  }

  async getWorks() {
    try {
      const { data } = await api.get("/work/");
      return data;
    } catch (error) {
      this.handleError(error, "fetch");
    }
  }

  async getWorkByCrossCuttingTheme(crossCuttingTheme: string) {
    try {
      const { data } = await api.get(
        `/work/?cross_cutting_theme=${crossCuttingTheme}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "fetch");
    }
  }

  async updateWork(workId: string, partialWorkData: any) {
    try {
      const { data } = await api.patch(`/work/${workId}/`, partialWorkData);
      return data;
    } catch (error) {
      this.handleError(error, "patch");
    }
  }

  async getUserWorks(userType: string, userId: string) {
    type userWorks = {
          advisor: Array<any>,
          collaborator: Array<any>,
          evaluator: Array<any>,
      }
    try {
      if (userType === "STUDENT") {
        const { data } = await api.get(`/work/?team_member_id=${userId}`);
        return data;
      } else if (userType === "TEACHER") {
        const works:userWorks = {
          advisor: [],
          collaborator: [],
          evaluator: [],
        }
        let response = await api.get(`/work/?advisor_id=${userId}`);
        response.data.forEach((item: any) => works.advisor.push(item));
        response = await api.get(`/work/?collaborator_id=${userId}`);
        response.data.forEach((item: any) => {
          if (!works.collaborator.find((work: any) => work.id === item.id)) works.collaborator.push(item);
        });
        response = await api.get(`/work/?evaluator_id=${userId}`);
        response.data.forEach((item: any) => {
          if (!works.evaluator.find((work: any) => work.id === item.id)) works.evaluator.push(item);
        });
        return works;
      }

      return null
    } catch (error) {
      this.handleError(error, "fetch");
    }
  }

  async approveWork(verification_token: string) {
    try {
      const { data } = await api.get(`/accept-work/${verification_token}/`);
      return data;
    } catch (error) {
      this.handleError(error, "approve");
    }
  }

  async rejectWork(verification_token: string) {
    try {
      const { data } = await api.get(`/reject-submission/${verification_token}/`);
      return data;
    } catch (error) {
      this.handleError(error, "reject");
    }
  }

  async cancelWork(id:String | Number, token: string) {
    try {
      const {data} = await api.delete(`/work/${id}/`, {
        headers: {Authorization: `Bearer: ${token} `}
      })
      return data
    } catch (error) {
      this.handleError(error, "remove work")
    }
  }
}

export default new WorkService();
