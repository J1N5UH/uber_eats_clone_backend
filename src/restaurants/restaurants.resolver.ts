import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => [Restaurant]) //"[]"는 graephql 규칙
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args('input') CreateRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    console.log(CreateRestaurantDto);
    try {
      await this.restaurantService.createRestaurant(CreateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  @Mutation((returns) => Boolean)
  async updateRestarant(
    @Args('input') UpdateRestaurantDto: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(UpdateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
