import { IRobot } from "../models/IRobot";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public robots: IRobot[];
  constructor(private storage: Storage) {}

  pushRobot(id: string, alias: string) {
    let existRobot: boolean;
    this.robots.forEach((robot) => {
      robot.id.includes(id) && (robot.alias = alias) && (existRobot = true);
    });

    existRobot ? null : this.robots.push({ id, alias });
    this.storage.set("robots", this.robots);
  }

  removeRobot(id: string) {
    this.robots.forEach((robot, index) => {
      robot.id.includes(id) && this.robots.splice(index);
    });
    this.storage.set("robots", this.robots);
  }

  getRobots() {
    return new Observable<IRobot[]>((observer) => {
      this.storage
        .get("robots")
        .then((data) => {
          data
            ? (this.robots = data) && observer.next(this.robots)
            : (this.robots = []);
        })
        .catch((error) => observer.error(error));
    });
  }
}
